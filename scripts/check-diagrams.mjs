#!/usr/bin/env node
/**
 * Keeps the diagrams honest: every fenced ```mermaid block in README.md must have a matching
 * source file in diagrams/ (same name, .mmd), and every .mmd file must be referenced.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";

const readme = readFileSync("README.md", "utf8");
const referenced = [...readme.matchAll(/\.\/diagrams\/([a-z0-9-]+)\.mmd/g)].map((m) => m[1]);
const present = existsSync("diagrams")
  ? readdirSync("diagrams").filter((f) => f.endsWith(".mmd")).map((f) => f.replace(/\.mmd$/, ""))
  : [];

const missing = referenced.filter((name) => !present.includes(name));
const unreferenced = present.filter((name) => !referenced.includes(name));

if (missing.length) {
  console.error("referenced but missing in diagrams/:", missing.join(", "));
  process.exit(1);
}
if (unreferenced.length) {
  console.error("present in diagrams/ but never referenced from the README:", unreferenced.join(", "));
  process.exit(1);
}
const mermaidBlocks = (readme.match(/```mermaid/g) ?? []).length;
if (mermaidBlocks !== present.length) {
  console.error(`README has ${mermaidBlocks} mermaid blocks but diagrams/ has ${present.length} sources`);
  process.exit(1);
}
console.log(`OK - ${mermaidBlocks} diagrams, sources and README are in sync`);
