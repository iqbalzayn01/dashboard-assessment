import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseKey);

export const getImageUrl = (name: string, path: 'student-assessment') => {
  const { data } = supabase.storage
    .from('student-assessment')
    .getPublicUrl(`public/images/${path}/${name}`);

  return data.publicUrl;
};

export const uploadFile = async (file: File, path: 'student-assessment') => {
  const fileType = file.type.split('/')[1];
  const filename = `${path}-${Date.now()}.${fileType}`;

  await supabase.storage
    .from('student-assessment')
    .upload(`public/images/${path}/${filename}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  return filename;
};

export const deleteFile = async (
  filename: string,
  path: 'student-assessment'
) => {
  await supabase.storage
    .from('student-assessment')
    .remove([`public/images/${path}/${filename}`]);
};
