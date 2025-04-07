import PageHeader from "@/components/page-header";

export default function Layout({ children }) {
  return (
    <>
        <PageHeader className="my-8" />
        <main>{children}</main>
        <footer className="text-center mt-8 mb-8 text-sm text-gray-500 font-mono">Made with ❤️ by <a href="https://github.com/WenbinFan" target="_blank">Wenbin</a></footer>
    </>
  )
}