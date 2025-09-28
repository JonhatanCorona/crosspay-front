import PaymentForm from "@/app/components/payment/PaymentForm";


export default function PaymentPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100"
    style={{
        backgroundColor: "var(--bg-ppal)", // usa tu variable global
      }}>
      <PaymentForm />
    </main>
  )
}