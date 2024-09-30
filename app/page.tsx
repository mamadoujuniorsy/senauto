import Contact from "@/components/Contact"
import FAQ from "@/components/Faq"
import Hero from "@/components/Hero"
import Marketing from "@/components/Marketing"
const Home = () => {
  return (
   <main className="mt-6 overflow-hidden">
    <Hero />
    <Marketing />
    <div id="faq">
      <FAQ />
    </div>
    <div id="contact">
      <Contact />
    </div>
   </main>
  )
}

export default Home