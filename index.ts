import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';

const loadDocument = async () => {
    const path = './assets';
    const loader = new DirectoryLoader(path, {
        '.md': (path) => new TextLoader(path),
    });
    const docs = await loader.load();
    console.log(docs)
};
