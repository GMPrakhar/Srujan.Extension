import { createConnection, ProposedFeatures, TextDocuments, CompletionItem, CompletionItemKind } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

connection.onInitialize(() => {
    return {
        capabilities: {
            completionProvider: {
                resolveProvider: true
            }
        }
    };
});

connection.onCompletion(() => {
    return [
        {
            label: 'constant.numeric.srujan',
            kind: CompletionItemKind.Constant,
            data: 1
        },
        {
            label: 'variable.name',
            kind: CompletionItemKind.Variable,
            data: 2
        }
    ];
});

connection.onCompletionResolve((item) => {
    if (item.data === 1) {
        item.detail = 'Numeric constant in Srujan language';
    } else if (item.data === 2) {
        item.detail = 'Variable name in Srujan language';
    }
    return item;
});

documents.listen(connection);
connection.listen();