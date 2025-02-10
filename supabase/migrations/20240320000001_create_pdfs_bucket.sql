
insert into storage.buckets (id, name, public)
values ('pdfs', 'pdfs', true);

create policy "Public Access"
on storage.objects for select
to public
using ( bucket_id = 'pdfs' );

create policy "Authenticated users can upload PDFs"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'pdfs'
  and storage.extension(name) = 'pdf'
);
