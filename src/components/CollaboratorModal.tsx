
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, FileText } from "lucide-react";

interface CollaboratorModalProps {
  collaborator: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CollaboratorModal({ collaborator, open, onOpenChange }: CollaboratorModalProps) {
  if (!collaborator) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Colaborador</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={collaborator.photo} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-2xl">
                {collaborator.fullName.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{collaborator.fullName}</h2>
              <Badge variant="secondary" className="mt-1">{collaborator.function}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Informações de Contato</h3>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{collaborator.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{collaborator.phone}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Medidas</h3>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Camisa:</span> {collaborator.shirtSize}</p>
                <p><span className="font-medium">Calça:</span> {collaborator.pantsSize}</p>
                <p><span className="font-medium">Sapato:</span> {collaborator.shoeSize}</p>
              </div>
            </div>
          </div>

          {collaborator.notes && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Observações</h3>
              <p className="text-sm text-gray-700">{collaborator.notes}</p>
            </div>
          )}

          {collaborator.documents && collaborator.documents.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Documentos</h3>
              <div className="flex flex-wrap gap-2">
                {collaborator.documents.map((doc: string, index: number) => (
                  <div key={index} className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-md text-sm">
                    <FileText className="h-3 w-3" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
