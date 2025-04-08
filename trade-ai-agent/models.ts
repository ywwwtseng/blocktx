import { sql } from "bun";

export interface EventInput {
  id: string;
  type: string;
  trading_pair: string;
  fng: number;
  details?: any;
}

export interface Event {
  id: string;
  type: string;
  trading_pair: string;
  fng: number;
  details: any;
  created_at: string;
  updated_at: string;
}

export const event = {
  create: async (input: EventInput) => {
    const created_at = new Date().toISOString();
    const existed = await sql`SELECT * FROM "Event" WHERE id = ${input.id}`;

    if (existed.length > 0) {
      throw new Error("Event already exists");
    }

    const result = await sql`
      INSERT INTO "Event" ${sql({
        ...input,
        created_at,
        updated_at: created_at,
      })}
      RETURNING *
    `;

    return result[0];
  },
};