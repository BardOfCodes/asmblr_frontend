/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as Texturity from 'texturity.js';
import { ClassicPreset, GetSchemes, NodeEditor, BaseSchemes } from 'rete';
import { DataflowEngine } from 'rete-engine';
// @ts-ignore
import { saveAs } from 'file-saver';
import { AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import { AutoArrangePlugin, Presets as ArrangePresets } from 'rete-auto-arrange-plugin'
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { ContextMenuExtra, ContextMenuPlugin, Presets as ContextMenuPresets } from 'rete-context-menu-plugin';
import { ReactArea2D, ReactRenderPlugin, Presets } from 'rete-react-render-plugin';
import { debounce } from 'lodash';
import { createRoot } from "react-dom/client";
import * as Nodes from './components';
import * as SWNodes from './sw_components';
import { FloatControl, Vector2DControl, VectorControl } from "./controls/vector-control";
import { VectorUI } from "./controls/vector-ui";
import { SliderVectorControl } from './controls/slider-vector-control';
import { SliderVectorUI } from './controls/slider-vector-ui';
import { StringSelectionControl } from './controls/list-control';
import { StringSelectionControlUI } from './controls/list-control-ui';
import { ListControl } from './controls/dynamic-list';
import { ListControlUI } from './controls/dynamic-list-ui';
import { StringControl } from './controls/string-control';
import { StringControlUI } from './controls/string-ui';
import { importEditor } from './import-export';
import { Modules } from './modules';
import { ConnProps, Node } from './types'
import { getConnectionSockets } from './utils';
import { StyledNode } from './styled-node';
import { ZoomWithoutDblClick } from './zoom_mod';
import { HistoryPlugin, Presets as HistoryPresets
} from "rete-history-plugin";
import { CommentPlugin, CommentExtensions, InlineComment, FrameComment } from "rete-comment-plugin";
import { ExpectedScheme } from 'rete-scopes-plugin/_types/types';
// import { ScopesPlugin, Presets as ScopesPresets } from "rete-scopes-plugin";


class Connection<N extends Node> extends ClassicPreset.Connection<N, N> {}

export const socket = new ClassicPreset.Socket("socket");

export type Schemes = GetSchemes<Node, ConnProps>;

type AreaExtra = ReactArea2D<Schemes> | ContextMenuExtra;

export type DiContainer = {
  updateControl: (id: string) => void
  updateNode: (id: string) => void
  process: () => void
  editor: NodeEditor<Schemes>
  modules: Modules
}

export async function createEditor(
  container: HTMLElement,
  getModuleData: () => any,
  log: (message: string, type: "info" | "error") => void
) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactRenderPlugin<Schemes, AreaExtra>({ createRoot });
  // const scopes = new ScopesPlugin<ExpectedScheme>();
  const arrange = new AutoArrangePlugin<ExpectedScheme>();
  const engine = new DataflowEngine<Schemes>();
  const history = new HistoryPlugin<Schemes>();
  // const comment = new CommentPlugin<ExpectedScheme, AreaExtra>();


  myKeyboard(history);

  history.addPreset(HistoryPresets.classic.setup());

  Texturity.clearCache();
  Texturity.initGL('webgl2');

  function _process() {
    engine.reset();
    Texturity.disposeTextures();

    editor
      .getNodes()
      .filter((n) => n instanceof Nodes.OutputMaterial)
      .forEach((n) => {
        engine.fetch(n.id)
      })
  }
  const process = debounce(_process, 500)
  const modules = new Modules(
    (path) => getModuleData()[path],
    async (path, editor) => {
      const data = getModuleData()[path];

      if (!data) throw new Error("cannot find module");
      await importEditor(
        {
          process: () => null,
          updateNode: () => null,
          updateControl: () => null,
          editor,
          modules
        },
        data
      );
    }
  );

  const di: DiContainer = {
    process,
    updateNode: (id) => area.update('node', id),
    updateControl: (id) => area.update('control', id),
    editor,
    modules
  }
  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([
      ['Primitives', [
        ['2D', [
          ['Rectangle2D', () => new SWNodes.Rectangle2D({'size': [0.5, 0.5]})],
          ['Trapezoid2D', () => new SWNodes.Trapezoid2D({'r1': [0.5], 'r2': [0.5], 'height': [0.5]})],
          ['Polyline2D', () => new SWNodes.PolyLine2D({'points': [[0.0, -0.5, 0.2], [0.0, 0.5, 0],
                                                                  [1.0, 0.0, 0.0], [0.0, -0.5, 0.0]]})],
          ['Circle2D', () => new SWNodes.Circle2D({'radius': [0.5]})],
        ]],
        ['3D', [
          ['Plane3D', () => new SWNodes.Plane3D({'origin': [0.0, 0.0, 0.0], 'normal': [0.0, 1.0, 1.0]})],
        ]],
        ["RegisterGeometry", () => new SWNodes.RegisterGeometry({'name': "base", "bbox": [2.0, 4.0, 2.0]})],
        ["RegisterState", () => new SWNodes.RegisterState({'state': [0]})],
        ["NamedGeometry", () => new SWNodes.NamedGeometry({'name': 'base'})],
        ["RGB", () => new SWNodes.RegisterGeometryBeta({'name': "base", "bbox_scale": [2.0, 4.0, 2.0], 'bbox_origin': [0.0, 0.0, 0.0]})],
      ]],
      ["Transforms", [
        ["2D", [
          ["Translate2D", () => new SWNodes.Translate2D({'param': [0.5, 0.5]})],
          ["EulerRotate2D", () => new SWNodes.EulerRotate2D({'param': [0.5]})],
          // ["Scale2D", () => new SWNodes.Scale2D({'param': [0.25, 0.25]})],
          ["Dilate2D", () => new SWNodes.Dilate2D({'k': [0.5]})],

        ]],
        ["3D", [
          ["Translate3D", () => new SWNodes.Translate3D({'param': [0.5, 0.5, 0.5]})],
          ["EulerRotate3D", () => new SWNodes.EulerRotate3D({'param': [0.5, 0.5, 0.5]})],
          // ["Scale3D", () => new SWNodes.Scale3D({'param': [0.5, 0.5, 0.5]})],
        ]],
      ]],
      ["Variables", 
        [
          ["Primitives", [
          ["Float", () => new SWNodes.Float({'value': [0.5,]})],
          ["Vec2D", () => new SWNodes.Vec2({'value_1': [0.5,], 'value_2': [0.5,]})],
          ["Vec3D", () => new SWNodes.Vec3({'value_1': [0.5,], 'value_2': [0.5,], 'value_3': [0.5,]})],
          ["Vec4D", () => new SWNodes.Vec4({'value_1': [0.5,], 'value_2': [0.5,], 'value_3': [0.5,], 'value_4': [0.5,]})],
          ]],
          ["Uniforms", [
            ["UniformFloat", () => new SWNodes.UniformFloat({'min': [0.0], 'max': [1.0], 'value': [0.5], 'name': 'uni'})],
            ["UniformVec2", () => new SWNodes.UniformVec2({'min': [0.0, 0.0], 'max': [1.0, 1.0], 'value': [0.5, 0.5], 'name': 'uni'})],
            ["UniformVec3", () => new SWNodes.UniformVec3({'min': [0.0, 0.0, 0.0], 'max': [1.0, 1.0, 1.0], 'value': [0.5, 0.5, 0.5], 'name': 'uni'})],
          ]],
          ["Splitter", [
            ["SplitVec2D", () => new SWNodes.SplitVec2D({"expr": [0.5, 0.5]})],
            ["SplitVec3D", () => new SWNodes.SplitVec3D({"expr": [0.5, 0.5, 0.5]})],
            ["SplitVec4D", () => new SWNodes.SplitVec4D({"expr": [0.5, 0.5, 0.5, 0.5]})],
          ]]
        ]
        ],
      ["Process", [
        // ["ConvertToShaderNode", () => new SWNodes.ConvertToShaderNode()],
        ["SetMaterial", () => new SWNodes.SetMaterial({"material": [2.0]})],
        ["LHF3D", () => new SWNodes.LinkedHeightField3D()],
        ["ApplyHeight", () => new SWNodes.ApplyHeight({'height': [0.5]})],
        ["MarkerNode", () => new SWNodes.MarkerNode()],
        ["BBAH", () => new SWNodes.BBoxedApplyHeight({'height': [0.5], 'bbox_origin': [0.0, 0.0], 'bbox_scale': [1.0, 1.0]})],
      ]
      ],
      ['Maths', [
        ['UnaryOperator', () => new SWNodes.UnaryOperator({'operator': 'NEG'})],
        ['BinaryOperator', () => new SWNodes.BinaryOperator({'operator': 'ADD'})],
        ['VectorOperator', () => new SWNodes.VectorOperator({'operator': 'NORM'})],
      ]],
      ["Combinators", [
        ["Difference", () => new SWNodes.Difference()],
        ["Union", () => new SWNodes.Union()],
        ["Intersection", () => new SWNodes.Intersection()],
        ["Complement", () => new SWNodes.Complement()],
      ]
      ],
    ])
  });
  area.use(contextMenu);

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  AreaExtensions.snapGrid(area, {
    size: 20
  });

  render.addPreset(Presets.contextMenu.setup({ delay: 200 }));

  render.addPreset(
    Presets.classic.setup({
      customize: {
        node(context) {
          return StyledNode;
        },
      }
    })
  );

  // const controlMap = new Map<any, any>([
  //   [VectorControl, VectorUI],
  //   [SliderVectorControl, SliderVectorUI],
  //   [StringSelectionControl, StringSelectionControlUI],
  //   [ListControl, ListControlUI],
  //   [StringControl, StringControlUI],
  // ]);
  
  // render.addPreset(
  //   Presets.classic.setup({
  //     customize: {
  //       control(data) {
  //         // Ensure the payload is defined and its constructor matches a key in the map
  //         const ControlUI = data.payload && controlMap.get(data.payload.constructor);
  //         return ControlUI || Presets.classic.InputControl;
  //       },
  //     },
  //   })
  // );

  render.addPreset(Presets.classic.setup({
    customize: {
      control(data) {
        if (
          data.payload instanceof VectorControl
        ) {
          return VectorUI;
        }
        if (data.payload instanceof SliderVectorControl) {
          return SliderVectorUI;
        }
        if (data.payload instanceof StringSelectionControl) {
          return StringSelectionControlUI;
        }
        if (data.payload instanceof ListControl) {
          return ListControlUI;
        }
        if (data.payload instanceof StringControl) {
          return StringControlUI;
        }
        return Presets.classic.InputControl as any
      },
    }
  }));

  connection.addPreset(ConnectionPresets.classic.setup());

  // scopes.addPreset(ScopesPresets.classic.setup());

  addCustomBackground(area);

  arrange.addPreset(ArrangePresets.classic.setup());

  editor.use(engine);
  editor.use(area);
  area.use(connection);
  area.use(render);
  // area.use(scopes);
  area.use(arrange);
  area.use(history);
  // area.use(comment);

  AreaExtensions.simpleNodesOrder(area);

  const selector = AreaExtensions.selector();
  const accumulating = AreaExtensions.accumulateOnCtrl();
  // CommentExtensions.selectable(comment, selector, accumulating);


  area.area.setZoomHandler(
    new ZoomWithoutDblClick(0.07,)
  );

  AreaExtensions.showInputControl(area);

  editor.addPipe((context) => {
    if (["connectioncreated", "connectionremoved"].includes(context.type)) {
      process();
    }
    return context;
  });
  editor.addPipe((context) => {
    if (context.type === "connectioncreate") {
      const { data } = context;
      const { source, target } = getConnectionSockets(editor, data);

    }
    return context;
  });

  function zoomAt() {
    AreaExtensions.zoomAt(area, editor.getNodes())
  }
  return {
    di,
    editor,
    // area,
    process,
    destroy: () => area.destroy(),
    // layout: () => arrange.layout(),
    layout: () => updateAndArrange(editor, area, arrange), // Default layout
    savePositions: () => savePositions(editor, area),
    loadPositions: (positions: Record<string, {x: number, y: number}>) => loadPositions(editor, area, positions),
    zoomAt,
    // saveComments: () => saveComments(comment, editor),
    // loadComments: (comments: Record<string, CommentData> ) => loadComments(area, comment, comments),
    // comment_plugin: comment,
  }
}
// UPDATED FUNCTIONS

export function updateAndArrange(
  editor: NodeEditor<Schemes>,
  area: AreaPlugin<Schemes, AreaExtra>,
  arrange: AutoArrangePlugin<ExpectedScheme>,
  timeout = 50 // Default timeout
) {
  setTimeout(() => {
    // Step 1: Set initial heights based on DOM
    // also get the zoom factor. 
    const area_scale = area.area.transform.k;
    editor.getNodes().forEach((node) => {
      const nodeView = area.nodeViews.get(node.id);

      if (nodeView) {
        const domElement = nodeView.element as HTMLElement;
        const rect = domElement.getBoundingClientRect();
        node.height = (rect.height || 0) / area_scale; // Set the node height
      }
    });

    arrange.layout();
    // Step 2: Perform auto-arrangement

    editor.getNodes().forEach((node) => {
      node.height = undefined; // Reset height to allow dynamic recalculation
    });
    // Step 3: Unset heights and re-render after layout
    setTimeout(() => {
      // Trigger re-render for all nodes
      editor.getNodes().forEach((node) => {

        const nodeView = area.nodeViews.get(node.id);
        // nodeView?.resize(200, 200)

        const el = nodeView?.element.children.item(0) as HTMLElement;
        el.style.height = "";
        });
    }, timeout); // Second timeout to ensure layout is complete
  }, timeout); // First timeout for initial layout
}

// COMMENTS
type CommentType = 'inline' | 'frame';

type CommentData = {
  x: number;
  y: number;
  width: number;
  height: number;
  links: string[];
  text: string;
  type: CommentType; // Added type field to distinguish comment types
};
export function saveComments(
  comment_plugin: CommentPlugin<ExpectedScheme, AreaExtra>,
  editor: NodeEditor<Schemes>
): Record<string, CommentData> {
  const comments: Record<string, CommentData> = {};

  comment_plugin.addFrame("Testing", [editor.nodes[0].id]);
  comment_plugin.comments.forEach((comment, id) => {
    const { x, y, width, height, links, text } = comment;
    const type = comment instanceof InlineComment ? 'inline' : 'frame'; // Determine comment type

    comments[id] = {
      x,
      y,
      width,
      height,
      links,
      text,
      type,
    };
  });

  return comments;
}
export function loadComments(
  area: AreaPlugin<Schemes, AreaExtra>,
  comment_plugin: CommentPlugin<ExpectedScheme, AreaExtra>,
  comments: Record<string, CommentData>
) {
  comment_plugin.clear();
  // Iterate through saved comments
  Object.entries(comments).forEach(([id, data]) => {
    let comment;

    if (data.type === 'inline') {
      // Add inline comment
      comment = comment_plugin.addInline(data.text, [data.x, data.y]);
    } else if (data.type === 'frame') {
      // Add frame comment
      comment = comment_plugin.addFrame(data.text, data.links);
      comment_plugin.translate(comment.id, data.x, data.y); // Translate comment to saved position
    }

    if (comment) {
      comment.links = data.links; // Restore links
      comment.height = data.height; // Set height
      comment.width = data.width; // Set width
    }
  });

  // Re-render the area to reflect changes
}

// POSITIONS

export function savePositions(
  editor: NodeEditor<Schemes>,
  area: AreaPlugin<Schemes, AreaExtra>
): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};

  editor.getNodes().forEach((node) => {
    const nodeView = area.nodeViews.get(node.id);
    if (nodeView) {
      const { x, y } = nodeView.position; // Access position from nodeView
      positions[node.id] = { x, y }; // Save position to the dictionary
    }
  });

  return positions; // Return the dictionary of positions
}
export function loadPositions(
  editor: NodeEditor<Schemes>,
  area: AreaPlugin<Schemes, AreaExtra>,
  positions: Record<string, { x: number; y: number }>
) {

  editor.getNodes().forEach((node) => {
    const nodeView = area.nodeViews.get(node.id);
    if (nodeView) {
      nodeView.translate(positions[node.id].x, positions[node.id].y);
    }
  });
}

// Zoom and BG

export interface Action {
  undo(): void | Promise<void>
  redo(): void | Promise<void>
}
export function myKeyboard<Schemes extends BaseSchemes, A extends Action>(plugin: HistoryPlugin<Schemes, A>) {
  document.addEventListener('keydown', e => {
    if (!e.metaKey && !e.ctrlKey) return; // Check for Cmd (Mac) or Ctrl (Windows/Linux)

    if (e.code === 'KeyZ') {
      if (e.shiftKey) {
        // Cmd+Shift+Z or Ctrl+Shift+Z -> Redo
        void plugin.redo();
      } else {
        // Cmd+Z or Ctrl+Z -> Undo
        void plugin.undo();
      }

      e.preventDefault(); // Prevent default browser behavior (e.g., undoing input)
    }
  });
}

export function addCustomBackground<S extends BaseSchemes, K>(
  area: AreaPlugin<S, K>
) {
  const background = document.createElement("div");
  background.classList.add("background");
  background.classList.add("fill-area");
  area.area.content.add(background);
}


