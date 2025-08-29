import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, Key, User } from "lucide-react";

export default function Profile() {
  const { user, signOut, updateProfile, resetPassword } = useAuth();
  const { userPermissions } = usePermissions();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState(user?.user_metadata?.first_name || "");
  const [lastName, setLastName] = useState(user?.user_metadata?.last_name || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const updates: any = {};
    if (firstName) updates.first_name = firstName;
    if (lastName) updates.last_name = lastName;
    const { error } = await updateProfile(updates);
    setLoading(false);
    if (!error) {
      toast({ title: "Perfil atualizado!", description: "Seus dados foram salvos." });
    }
  };

  const handleChangePassword = async () => {
    if (!user?.email) return;
    setLoading(true);
    const { error } = await resetPassword(user.email);
    setLoading(false);
    if (!error) {
      toast({ title: "Email enviado!", description: "Verifique sua caixa de entrada para redefinir a senha." });
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-10 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Meu Perfil</CardTitle>
            <p className="text-sm text-gray-500">Suas informações pessoais e de acesso</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <Input value={user.email || ""} disabled readOnly />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Primeiro Nome</label>
              <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Digite seu primeiro nome" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Sobrenome</label>
              <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Digite seu sobrenome" />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdate} loading={loading} disabled={loading} className="w-full">Atualizar</Button>
              <Button variant="outline" onClick={handleLogout} className="w-full flex gap-2"><LogOut className="h-4 w-4" />Sair</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" onClick={handleChangePassword} className="flex gap-2"><Key className="h-4 w-4" />Trocar senha</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissões e Função</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Função:</span>
              <Badge className="ml-2 capitalize">{userPermissions?.role || 'member'}</Badge>
            </div>
            <div>
              <span className="text-sm text-gray-500">Permissões:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {userPermissions?.permissions?.map((perm: string) => (
                  <Badge key={perm} variant="secondary">{perm}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
} 