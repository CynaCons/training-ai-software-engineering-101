import "./diagrams.css";

const HUMAN_APIS = [
  "turn on the terminal",
  "reflash via bootloader",
  "dump memory (debugger)",
] as const;

/** MCP as thin API over heavy code — and as a human↔technical bridge. */
export function McpBridge() {
  return (
    <div
      className="mcp-bridge"
      role="img"
      aria-label="MCP bridges human language to complex technical workflows"
    >
      <div className="mcp-bridge__row">
        <div className="mcp-bridge__box mcp-bridge__box--model">
          <span>Model</span>
          <strong>Human-shaped tools</strong>
          <ul className="mcp-bridge__apis">
            {HUMAN_APIS.map((api) => (
              <li key={api}>“{api}”</li>
            ))}
          </ul>
        </div>
        <div className="mcp-bridge__pipe" aria-hidden>
          MCP
        </div>
        <div className="mcp-bridge__box mcp-bridge__box--code">
          <span>Server (often Python)</span>
          <strong>Technical reality</strong>
          <p>
            Drivers, protocols, flash sequences, debugger scripts — whatever the
            tool name hides
          </p>
        </div>
      </div>
      <p className="mcp-bridge__caption">
        Design MCP APIs to match how humans talk about the system. The model
        calls “reflash via bootloader”; your server runs the ugly sequence.
        Tokens mostly for the call + observation — not for the work itself.
      </p>
    </div>
  );
}
