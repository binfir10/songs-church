import { Suspense } from "react";
import Loading from "./loading";
import EditSongPage from "@/components/edit-form";

export default function page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <EditSongPage params={params}  />
    </Suspense>
  )
}
