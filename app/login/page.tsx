"use client";
import { useSupabase } from "@/components/supabase/supabase-provider";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    // const errorMsg = await login(email, password);

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // if (errorMsg) {
    //   setErrorMessage(errorMsg);
    //   setLoading(false);
    //   return;
    // }

    router.push("/");
  }

  return (
    <>
      <div className="mx-auto mt-10 flex h-full w-5/6 flex-col gap-3 lg:w-1/3">
        <h1>Einloggen</h1>
        <Input label="E-Mail" type="email" value={email} onChange={setEmail} />
        <Input label="Password" type="password" value={password} onChange={setPassword} onEnter={handleLogin} />
        <Button onClick={handleLogin} loading={loading} disabled={disabled}>
          Einloggen
        </Button>
        <span className="pt-10 text-center text-sm">
          <Link href="/registration">Registrieren</Link>
          {" // "}
          <Link href="/password-reset">Passwort vergessen</Link>
          {" // "}
          <Link href={`/activate/${email}`}>Account aktivieren</Link>
        </span>
      </div>
      <Alert show={errorMessage.length > 0} onConfirm={() => setErrorMessage("")}>
        {errorMessage}
      </Alert>
    </>
  );
}
