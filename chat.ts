import { MessageFieldWithRole } from '@langchain/core/messages';
import { ChatGroq } from '@langchain/groq';
import { PineconeStore } from '@langchain/pinecone';

const { GROQ_API_KEY } = process.env;

const MAX_HISTORY = 10;
const history: MessageFieldWithRole[] = [];

if (history.length > MAX_HISTORY) {
    history.shift();
}

export async function Chat(prompt: string, vectorStore: PineconeStore) {
    const context = await vectorStore.similaritySearch(prompt, 3);
    const joinContext = context.map((doc) => doc.pageContent).join('\n');

    history.push({
        role: 'user',
        content: prompt,
    });

    const llm = new ChatGroq({
        apiKey: GROQ_API_KEY as string,
        model: 'llama-3.1-8b-instant',
        temperature: 0.2,
    });

    const systemPrompt = `You are a helpful assistant from BPJS Kesehatan, an insurance company from Indonesia. 
        You are here to help answer questions from future customers. Please response in friendly and professional manner.
        If you don't know the answer, you can say that you cannot help with that.
        Here's the previous conversation: ${history.map((msg) => msg.content).join('\n')}
    
        Here's the context to help you with the answers: ${joinContext}
    `;

    const aiResponse = await llm.invoke([
        {
            role: 'system',
            content: systemPrompt,
        },
        {
            role: 'user',
            content: prompt,
        },
    ]);

    history.push({
        role: 'assistant',
        content: aiResponse.content
    })

    return aiResponse.content;
}
