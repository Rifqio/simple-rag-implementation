# Simple RAG (Retrieval-Augmented Generation) with LLaMA and Groq

## Overview

This project implements a simple Retrieval-Augmented Generation (RAG) system using:

* **LLaMA 3.1-8B (via Groq API)** as the Large Language Model (LLM)
* **Hugging Face Transformers** for text embeddings
* **Pinecone** as the vector database
* **LangChain** as the framework for orchestration

The system allows users to ask questions, and it retrieves relevant context from the stored vector database before generating a response using the LLM.

---

## Features

* **Embeddings with Hugging Face Transformers** : Converts text into vector representations for efficient retrieval.
* **Pinecone Vector Store** : Stores and retrieves relevant documents based on similarity search.
* **LLaMA Model via Groq** : Generates responses based on the retrieved context.
* **Memory Handling** : Maintains a history of the conversation for more contextual responses.
* **Customizable System Prompt** : Defines a friendly, professional assistant persona for BPJS Kesehatan.

---

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Rifqio/simple-rag-implementation
   cd simple-rag
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your API keys:
   ```ini
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX=your_pinecone_index
   GROQ_API_KEY=your_groq_api_key
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

---

## Project Structure

```
📂 simple-rag
├── 📂 assets  # Knowledge assets
├── 📄 index.ts  # Main entry point
├── 📄 chat.ts  # Handles chat interaction with Groq LLM
├── 📄 datastore.ts  # Manages vector storage with Pinecone
├── 📄 .env  # API keys (not included in repo)
├── 📄 package.json  # Dependencies & scripts
└── 📄 README.md  # Documentation
```

---

## Usage

The main function initializes the vector store and processes a user query:

```typescript
async function main() {
    const vectorStore = await GetDataStore();
    const chat = await Chat('What is the best insurance for me?', vectorStore);
    console.log(chat);
}
main();
```

### 1️⃣ **Text Embeddings and Vector Storage**

```typescript
const embeddings = new HuggingFaceTransformersEmbeddings({
    model: 'Xenova/all-MiniLM-L6-v2',
});
```

* Uses `all-MiniLM-L6-v2` for generating embeddings.
* Stores vectors in Pinecone under the `ns1` namespace.

### 2️⃣ **Retrieving Relevant Context**

```typescript
const context = await vectorStore.similaritySearch(prompt, 3);
```

* Retrieves the top 3 most relevant documents from Pinecone.

### 3️⃣ **Generating a Response using LLaMA via Groq**

```typescript
const llm = new ChatGroq({
    apiKey: GROQ_API_KEY as string,
    model: 'llama-3.1-8b-instant',
    temperature: 0.2,
});
```

* Calls LLaMA to generate a response based on the retrieved context.

## Future Improvements

* [ ] Add support for multiple vector databases.
* [ ] Implement caching for faster responses.
* [ ] Improve response handling and conversation flow.
