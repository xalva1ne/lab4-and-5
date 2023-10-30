import {createClient} from '@supabase/supabase-js'

const supabase = createClient('https://ymtznedovcqhjpmncfim.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltdHpuZWRvdmNxaGpwbW5jZmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2MzA2NjYsImV4cCI6MjAxNDIwNjY2Nn0.H_I0a7q8LTc_xTBDKUp-lctgcXpssr_rrkFCjsyU5YU')

export {
    supabase
}