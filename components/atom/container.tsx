export default function CustomContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-center">
      <div className="max-w-3xl w-full">{children}</div>
    </div>
  )
}
