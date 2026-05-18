// ==========================================
// CONFIG & INITIALIZATION
// ==========================================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Variable caalami ah oo lagu haynayo qofka login-ka ah
let currentUserId = null; 

// ==========================================
// CHECK AUTO EARNINGS (Mashiinka Faa'iidada)
// ==========================================
async function checkAndApplyEarnings(userId) {
    const now = new Date();
    
    try {
        const querySnapshot = await db.collection("investments")
            .where("userId", "==", userId)
            .where("status", "==", "Active")
            .get();
            
        querySnapshot.forEach(async (doc) => {
            const invest = doc.data();
            const investId = doc.id;
            
            // Xisaabi maalmaha dhaafay zameemka Firebase ka yimid
            const startDate = new Date(invest.startDate.seconds * 1000);
            const timeDiff = now.getTime() - startDate.getTime();
            const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Beddel maalmo
            
            // Haddii ay 5 maalmood dhaaftay oo aan faa'iido hore loo siin
            if (daysDiff >= 5 && !invest.profitClaimed) {
                const profit = invest.amount * 0.10; // 10% Faa'iido ah
                const userRef = db.collection("users").doc(userId);
                
                await db.runTransaction(async (transaction) => {
                    const userDoc = await transaction.get(userRef);
                    let currentBalance = userDoc.data().balance || 0;
                    
                    // U shub faa'iidada balance-ka qofka, qorshana xidh
                    transaction.update(userRef, { balance: currentBalance + profit });
                    transaction.update(db.collection("investments").doc(investId), { 
                        status: 'Completed',
                        profitClaimed: true 
                    });
                });
                
                alert(`Hambalyo! Waxaad heshay faa'iidada maalgashigaaga oo ah ${profit} TRX oo lagugu daray Balance-ka.`);
            }
        });
    } catch (error) {
        console.error("Khalad baa ku dhacay Auto-Earning: ", error);
    }
}

// ==========================================
// DEPOSIT & WITHDRAW (Codsiyada Lacagaha)
// ==========================================
async function submitTransaction(event, type) {
    event.preventDefault(); // Jooji in boggu dib u furmo
    
    // Aqoonso badhanka la riixay (Deposit ama Withdraw)
    const btnId = type === 'Deposit' ? 'deposit-submit-btn' : 'withdraw-submit-btn';
    const submitBtn = document.getElementById(btnId);
    const amountInput = document.getElementById(`${type.toLowerCase()}-amount`);
    
    if (!amountInput || !amountInput.value || amountInput.value <= 0) {
        alert("Fadlan qor lacag sax ah!");
        return;
    }
    
    const amount = parseFloat(amountInput.value);

    // 1. Curyaami badhanka isla marka la riixo (Anti-Spam Guard)
    if(submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Gudbinaysaa... Fadlan sug";
    }

    try {
        // 2. U dir xogta dhanka Firestore
        await db.collection("transactions").add({
            userId: currentUserId,
            type: type,
            amount: amount,
            status: "Pending", // Admin-ka ayaa Approve ka dhigi doona
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        alert(`Codsingaaga ${type} oo ah ${amount} TRX waa la gudbiyay, sug oggolaanshaha maamulka.`);
        amountInput.value = ""; // Nadiifi booska koodhka
        
    } catch (error) {
        alert("Waxaa dhacay khaldad: " + error.message);
        // Haddii uu khalad dhaco badhanka dib u fur
        if(submitBtn) submitBtn.disabled = false;
    } finally {
        if(submitBtn) submitBtn.innerText = type === 'Deposit' ? "Xaqiiji Dhigaalka" : "Xaqiiji Lacag Bixinta";
    }
}

// ==========================================
// AUTH STATE (Marka uu Qofku Soo Gasho App-ka)
// ==========================================
// Habkan wuxuu raddayaa marka user uu si guul leh u galo (Login)
function onUserLoginSuccess(userId) {
    currentUserId = userId;
    
    // 1. Kici mashiinka hubinta faa'iidada marka uu soo galo
    checkAndApplyEarnings(userId);
    
    // 2. Halkanna geli koodhkaaga kale ee soo raraya balance-ka shaashadda
    // ...
}
  
