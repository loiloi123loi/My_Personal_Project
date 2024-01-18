const {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.API_KEY_AI2)

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
]
const model = genAI.getGenerativeModel({
    model: 'models/gemini-pro',
    safetySettings,
})

const getRspGenerative = async (content) => {
    const result = await model.generateContent(content)
    const response = await result.response
    const text = response.text()
    return text
}

module.exports = getRspGenerative
