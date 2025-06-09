// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as Texturity from 'texturity.js';
import { ClassicPreset } from "rete";
import { BaseSchemes, NodeEditor, NodeId } from "rete";
import { Schemes } from '.';
import { Socket } from './sockets';

export async function removeConnections(
    editor: NodeEditor<BaseSchemes>,
    nodeId: NodeId
) {
    for (const c of [...editor.getConnections()]) {
        if (c.source === nodeId || c.target === nodeId) {
            await editor.removeConnection(c.id);
        }
    }
}

export async function clearEditor(editor: NodeEditor<BaseSchemes>) {
    for (const c of [...editor.getConnections()]) {
        await editor.removeConnection(c.id);
    }
    for (const n of [...editor.getNodes()]) {
        await editor.removeNode(n.id);
    }
}

type Input = ClassicPreset.Input<Socket>;
type Output = ClassicPreset.Output<Socket>;

export function getConnectionSockets(
    editor: NodeEditor<Schemes>,
    connection: Schemes["Connection"]
) {
    const source = editor.getNode(connection.source);
    const target = editor.getNode(connection.target);

    const output =
        source &&
        (source.outputs as Record<string, Input>)[connection.sourceOutput];
    const input =
        target && (target.inputs as unknown as Record<string, Output>)[connection.targetInput];

    return {
        source: output?.socket,
        target: input?.socket
    };
}
