import * as assert from 'assert';
import {TextDocument, TextEditor, Position, Range} from 'vscode';
import Helper from './helpers';
import DocSelector from '../src/doc/selector';

suite("Docblock selector tests", () => {
    let editor:TextEditor;
    let document:TextDocument;
    let selector:DocSelector;

    suiteSetup(function(done) {
        Helper.loadFixture('docs.php', (edit:TextEditor, doc:TextDocument) => {
            editor = edit;
            document = doc;
            selector = new DocSelector(editor);
            done();
        });
    });


    let expected = new Range(new Position(2, 0), new Position(7, 3));
    test("Find by start", () => {
        assert.deepStrictEqual(selector.find(new Position(2, 0)), expected);
        assert.deepStrictEqual(selector.find(new Position(2, 2)), expected);
        assert.deepStrictEqual(selector.find(new Position(2, 3)), expected);
    });

    test("Find by middle", () => {
        assert.deepStrictEqual(selector.find(new Position(3, 0)), expected);
        assert.deepStrictEqual(selector.find(new Position(3, 2)), expected);
        assert.deepStrictEqual(selector.find(new Position(4, 3)), expected);
        assert.deepStrictEqual(selector.find(new Position(6, 10)), expected);
    });

    test("Find by end", () => {
        assert.deepStrictEqual(selector.find(new Position(7, 0)), expected);
        assert.deepStrictEqual(selector.find(new Position(7, 2)), expected);
        assert.deepStrictEqual(selector.find(new Position(7, 3)), expected);
    });
});