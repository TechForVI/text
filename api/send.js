export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, userName } = req.body;
        
        const BOT_TOKEN = "8502761937:AAEzEWRMlXMvT-OAxi_ilArqkhiiSxS8RG";
        const CHAT_ID = "733863684";
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        const text = `📩 *New Feedback!*\n\n👤 User: ${userName || 'Unknown'}\n💬 Message: ${message}`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: "Markdown"
            })
        });

        const result = await response.json();

        if (result.ok) {
            return res.status(200).json({ success: true, message: "Sent to Telegram" });
        } else {
            return res.status(500).json({ success: false, error: result.description });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}