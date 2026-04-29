#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(
    import.meta.url));
const srcDir = path.resolve(scriptDir, "../src");

const tokenByValue = new Map([
    ["0px", "var(--space-000)"],
    ["1px", "var(--space-025)"],
    ["2px", "var(--space-050)"],
    ["4px", "var(--space-100)"],
    ["6px", "var(--space-150)"],
    ["8px", "var(--space-200)"],
    ["12px", "var(--space-300)"],
    ["16px", "var(--space-400)"],
    ["24px", "var(--space-500)"],
    ["32px", "var(--space-600)"],
    ["40px", "var(--space-700)"],
    ["48px", "var(--space-800)"],
    ["0.15s", "var(--motion-fast)"],
    ["0.2s", "var(--motion-fast)"],
    ["0.22s", "var(--motion-normal)"],
    ["0.32s", "var(--motion-slow)"],
    ["0.48s", "var(--motion-slower)"],
]);

const colorSuggestions = {
    color: "var(--foreground)",
    "background-color": "var(--background)",
    background: "var(--background)",
    "border-color": "var(--border)",
    "box-shadow": "var(--shadow-sm)",
};

function isTokensFile(filePath) {
    return filePath.endsWith(`${path.sep}tokens.css`);
}

async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const results = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...(await walk(fullPath)));
        } else if (entry.isFile() && entry.name.endsWith(".css")) {
            results.push(fullPath);
        }
    }
    return results;
}

function suggestToken(property, value) {
    const compactValue = value.trim().replace(/;$/, "");
    if (property.includes("color") || property === "background") {
        if (colorSuggestions[property]) {
            return colorSuggestions[property];
        }
        return "var(--color-token)";
    }

    if (property.includes("radius")) {
        return "var(--radius)";
    }

    if (property.includes("z-index")) {
        return compactValue.startsWith("-") ? "var(--z-behind)" : "var(--z-overlay)";
    }

    if (property.includes("transition")) {
        return tokenByValue.get(compactValue) ? ? "var(--motion-normal)";
    }

    return tokenByValue.get(compactValue) ? ? "var(--space-200)";
}

function classify(property, value) {
    const compactValue = value.trim().replace(/;$/, "");
    if (property.startsWith("--")) {
        return null;
    }
    if (compactValue.includes("var(")) {
        return null;
    }
    if (/^#(?:[0-9a-fA-F]{3,8})$/.test(compactValue) || /^rgba?\(/.test(compactValue) || /^hsla?\(/.test(compactValue)) {
        return { severity: "error", type: "color" };
    }
    if (property.includes("transition") && /\d+(\.\d+)?s/.test(compactValue)) {
        return { severity: "warning", type: "duration" };
    }
    if (property.includes("z-index") && /^-?\d+$/.test(compactValue)) {
        return { severity: "error", type: "z-index" };
    }
    if ((property.includes("radius") || property === "border-radius") && /\d/.test(compactValue)) {
        return { severity: "error", type: "radius" };
    }
    if (/(padding|margin|gap|inset|top|right|bottom|left|width|height|min-width|min-height|max-width|max-height|font-size|line-height|letter-spacing|box-shadow|shadow)/.test(property) && /\d/.test(compactValue)) {
        return { severity: "error", type: "spacing" };
    }
    if (/font-weight/.test(property) && /^\d{3}$/.test(compactValue)) {
        return { severity: "error", type: "font-weight" };
    }
    return null;
}

const files = (await walk(srcDir)).filter((filePath) => !isTokensFile(filePath));
const findings = [];

for (const filePath of files) {
    const text = await fs.readFile(filePath, "utf8");
    const lines = text.split(/\r?\n/);

    lines.forEach((line, index) => {
        const match = line.match(/^\s*([a-z-]+)\s*:\s*(.+);\s*$/i);
        if (!match) {
            return;
        }

        const property = match[1].toLowerCase();
        const value = match[2].trim();
        const classification = classify(property, value);

        if (!classification) {
            return;
        }

        findings.push({
            file: path.relative(srcDir, filePath),
            line: index + 1,
            property,
            value,
            severity: classification.severity,
            suggestion: suggestToken(property, value),
            type: classification.type,
        });
    });
}

const errors = findings.filter((finding) => finding.severity === "error");
const warnings = findings.filter((finding) => finding.severity === "warning");

console.log(`Token Audit`);
console.log(`Scanning ${files.length} CSS file(s)...`);
console.log("");

if (findings.length === 0) {
    console.log("No hardcoded visual values found.");
    process.exit(0);
}

for (const finding of findings) {
    const mark = finding.severity === "error" ? "x" : "!";
    console.log(`${finding.file}`);
    console.log(`  ${mark} L${finding.line}: ${finding.property}: ${finding.value} -> ${finding.suggestion}`);
}

console.log("");
console.log("=== Summary ===");
console.log(`Files scanned:      ${files.length}`);
console.log(`Issues found:       ${findings.length}`);
console.log(`Errors:             ${errors.length}`);
console.log(`Warnings:           ${warnings.length}`);

if (errors.length > 0) {
    process.exit(1);
}