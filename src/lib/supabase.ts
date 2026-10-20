import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://yvqijvlasvhgkogekcon.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNjNDFiYTRkLWVhOWEtNDhmYi1iMjgzLWFmNGQ1NDc5MTM3OCJ9.eyJwcm9qZWN0SWQiOiJ5dnFpanZsYXN2aGdrb2dla2NvbiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzkyMzk4MTkxLCJleHAiOjIxMDc3NTgxOTEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.ioTb2R_S6ekbD6ytX51wi7HsVH-rtdE3h1msvCtSjX8';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };