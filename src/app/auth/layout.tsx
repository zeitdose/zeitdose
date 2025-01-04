export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container grid min-h-screen grid-cols-2 items-center gap-1 py-24">
      <div className="mx-auto w-[500px]">{children}</div>
      <div className="mx-auto w-[600px]">
        <div className="h-[400px] w-[600px] rounded-3xl bg-brown-3" />
      </div>
    </div>
  )
}
