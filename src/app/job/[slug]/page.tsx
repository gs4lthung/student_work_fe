import JobDetailPage from "@/components/page/job/job-details";

export default function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  return <JobDetailPage params={params} />
}
