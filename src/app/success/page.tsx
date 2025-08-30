

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const fileUrl =
    typeof resolvedSearchParams?.file_url === "string" ? resolvedSearchParams.file_url : undefined;
  const link =
    typeof resolvedSearchParams?.link === "string" ? resolvedSearchParams.link : undefined;
  const type =
    typeof resolvedSearchParams?.type === "string" ? resolvedSearchParams.type : undefined;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-2">Thank you for your purchase.</p>
      {!fileUrl && !link ? (
        <p>No download or link was provided for this item.</p>
      ) : type === "file" || (!type && fileUrl) ? (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-4 py-2 rounded-full font-bold bg-[#1DB954] text-white hover:shadow-[0_0_10px_#1DB954] transition"
        >
          Download File
        </a>
      ) : type === "link" || (!type && link) ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-4 py-2 rounded-full font-bold bg-[#1DB954] text-white hover:shadow-[0_0_10px_#1DB954] transition"
        >
          Visit Link
        </a>
      ) : null}
    </div>
  );
}

export const dynamic = "force-dynamic";
