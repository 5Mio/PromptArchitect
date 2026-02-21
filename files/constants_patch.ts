// ─────────────────────────────────────────────────────────────
// PATCH: In src/lib/constants.ts, update the PromptOutput interface
// to include the new tags_integrated field returned by the API.
//
// FIND this block:
// ─────────────────────────────────────────────────────────────

/*
export interface PromptOutput {
  quality_score: number;
  detail_accuracy: number;
  main_prompt: string;
  negative_prompt: string;
  layers: {
    world?: string;
    subject?: string;
    motion?: string;
    lighting?: string;
    lens?: string;
    color?: string;
    physics?: string;
    intention?: string;
  };
  recommended_tool: string;
  ghost_director: string;
  use_case_notes: string;
}
*/

// REPLACE WITH:
/*
export interface PromptOutput {
  quality_score: number;
  detail_accuracy: number;
  tags_integrated?: number;   // ← ADD THIS LINE
  main_prompt: string;
  negative_prompt: string;
  layers: {
    world?: string;
    subject?: string;
    motion?: string;
    lighting?: string;
    lens?: string;
    color?: string;
    physics?: string;
    intention?: string;
  };
  recommended_tool: string;
  ghost_director: string;
  use_case_notes: string;
}
*/

export {};
