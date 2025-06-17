import JobDetailPage from "@/components/details/job/job-details";

export default function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  return <JobDetailPage params={params} />
}
