import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface User {
    id: string;
    email: string;
    name: string | null;
    age: number | null;
    has_pcos: boolean;
    has_pcod: boolean;
    created_at: string;
}

export interface Cycle {
    id: string;
    user_id: string;
    start_date: string;
    end_date: string | null;
    cycle_length: number | null;
    flow_type: 'light' | 'medium' | 'heavy' | null;
    pain_level: number | null;
    mood_symptoms: string[] | null;
    notes: string | null;
}

export interface KitOrder {
    id: string;
    user_id: string;
    kit_type: string;
    kit_contents: Record<string, unknown>;
    price: number;
    order_date: string;
    delivery_date: string | null;
    delivery_status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

export interface Newsletter {
    id: string;
    email: string;
    created_at: string;
}

// Helper functions
export async function subscribeToNewsletter(email: string) {
    const { data, error } = await supabase
        .from('newsletter')
        .insert([{ email }])
        .select();

    if (error) throw error;
    return data;
}

export async function createKitOrder(order: Omit<KitOrder, 'id' | 'order_date'>) {
    const { data, error } = await supabase
        .from('kit_orders')
        .insert([order])
        .select();

    if (error) throw error;
    return data;
}
