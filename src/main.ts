import cytoscape from "cytoscape";
import { edges, nodes, positions } from "./graph-data";
import "./styles.css";

const graphStyles: cytoscape.StylesheetCSS[] = [
  {
    selector: "node",
    css: {
      "background-color": "#ffffff",
      "border-color": "#4b2e83",
      "border-width": 2,
      color: "#1a1d1f",
      label: "data(label)",
      "font-family": "Open Sans, sans-serif",
      "font-size": 13,
      "font-weight": 700,
      height: 96,
      "overlay-opacity": 0,
      "text-halign": "center",
      "text-margin-y": 4,
      "text-max-width": "164px",
      "text-valign": "center",
      "text-wrap": "wrap",
      width: 196,
    },
  },
  {
    selector: "node:parent",
    css: {
      "background-color": "#f8faf8",
      "background-opacity": 0.62,
      "border-color": "#c5b4e3",
      "border-style": "dashed",
      "border-width": 2,
      color: "#4b2e83",
      "font-family": "Encode Sans, Open Sans, sans-serif",
      "font-size": 18,
      "font-weight": 800,
      "padding": "84px",
      "text-halign": "center",
      "text-margin-y": 34,
      "text-valign": "top",
    },
  },
  {
    selector: 'node[id = "codespaces"]',
    css: {
      "background-color": "#f0ecf7",
      "background-opacity": 0.85,
      "border-color": "#4b2e83",
      "border-style": "solid",
      "border-width": 3,
      color: "#32006e",
      "font-size": 18,
      "padding": "96px",
      shape: "round-rectangle",
      "text-margin-y": 24,
    },
  },
  {
    selector: 'node[id = "participant-flow"]',
    css: {
      "text-margin-y": 58,
    },
  },
  {
    selector: 'node[kind = "github"]',
    css: {
      "background-color": "#e0d7f0",
      "border-color": "#4b2e83",
      shape: "round-rectangle",
    },
  },
  {
    selector: 'node[kind = "huggingface"]',
    css: {
      "background-color": "#f2efe6",
      "border-color": "#b7a57a",
      shape: "round-rectangle",
    },
  },
  {
    selector: 'node[kind = "llm"]',
    css: {
      "background-color": "#e6faf9",
      "border-color": "#2ad2c9",
      shape: "hexagon",
    },
  },
  {
    selector: 'node[kind = "storage"]',
    css: {
      "background-color": "#ffffff",
      "border-color": "#6b4fa6",
      shape: "barrel",
    },
  },
  {
    selector: 'node[kind = "actor"]',
    css: {
      "background-color": "#ffffff",
      "border-color": "#b7a57a",
      shape: "ellipse",
    },
  },
  {
    selector: "node[url]",
    css: {
      "border-width": 4,
      "text-outline-color": "#ffffff",
      "text-outline-width": 1,
    },
  },
  {
    selector: "edge",
    css: {
      "curve-style": "bezier",
      "font-size": 11,
      "font-weight": 700,
      "font-family": "JetBrains Mono, Open Sans, sans-serif",
      "line-color": "#72777c",
      "target-arrow-color": "#72777c",
      "target-arrow-shape": "triangle",
      "text-background-color": "#ffffff",
      "text-background-opacity": 0.95,
      "text-background-padding": "5px",
      "text-margin-y": -14,
      width: 2,
      label: "data(label)",
    },
  },
  {
    selector: 'edge[kind = "creates"], edge[kind = "configures"], edge[kind = "connected_to"]',
    css: {
      "line-color": "#6b4fa6",
      "target-arrow-color": "#6b4fa6",
    },
  },
  {
    selector: 'edge[kind = "contains"]',
    css: {
      "line-color": "#4b2e83",
      "line-style": "dashed",
      "target-arrow-color": "#4b2e83",
    },
  },
  {
    selector: 'edge[kind = "checks"]',
    css: {
      "line-color": "#b7a57a",
      "target-arrow-color": "#b7a57a",
    },
  },
  {
    selector: 'edge[kind = "provisions"], edge[kind = "uses"]',
    css: {
      "line-color": "#32006e",
      "target-arrow-color": "#32006e",
      width: 3,
    },
  },
  {
    selector: 'edge[kind = "stores"]',
    css: {
      "line-color": "#6b4fa6",
      "line-style": "dotted",
      "target-arrow-color": "#6b4fa6",
    },
  },
  {
    selector: 'edge[kind = "routes_to"]',
    css: {
      "line-color": "#2ad2c9",
      "target-arrow-color": "#2ad2c9",
      width: 3,
    },
  },
  {
    selector: 'edge[kind = "logs_to"]',
    css: {
      "line-color": "#4b2e83",
      "line-style": "dashed",
      "target-arrow-color": "#4b2e83",
    },
  },
];

const cy = cytoscape({
  container: document.querySelector<HTMLDivElement>("#graph"),
  autoungrabify: true,
  autounselectify: true,
  boxSelectionEnabled: false,
  elements: [
    ...nodes.map((node) => ({ data: node })),
    ...edges.map((edge) => ({ data: edge })),
  ],
  layout: {
    name: "preset",
    positions,
    fit: true,
    padding: 42,
  },
  maxZoom: 1.4,
  minZoom: 0.25,
  panningEnabled: true,
  style: graphStyles,
  userPanningEnabled: false,
  userZoomingEnabled: false,
  wheelSensitivity: 0.18,
  zoomingEnabled: true,
});

cy.on("tap", "node[url]", (event) => {
  const url = event.target.data("url") as string | undefined;

  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
});

cy.on("mouseover", "node[url]", () => {
  cy.container()?.classList.add("is-link-hovered");
});

cy.on("mouseout", "node[url]", () => {
  cy.container()?.classList.remove("is-link-hovered");
});
