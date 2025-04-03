import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "./theme-provider";
import logoDark from "@/assets/scriptal-dark.png";
import logoLight from "@/assets/scriptal-white.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Camera } from "lucide-react";

export default function RequestForm() {
  const [formData, setFormData] = useState({
    context: "",
    description: "",
    classification: "",
    type: "",
    image: null as File | null,
    deliveryDate: "",
    nameRegister: ""
  });

  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? logoLight : logoDark;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement; 
    const file = target.files?.[0];
  
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };
  

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <img src={logoSrc} alt="Logo" className="w-32 h-auto mb-4" />
      <Alert className="w-full max-w-3xl mb-3">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Alerta!</AlertTitle>
        <AlertDescription>
          Preencha com clareza e detalhes para garantir um fluxo de trabalho eficiente. 
          Informações vagas podem comprometer o andamento do processo. <br />
          <br />
          A data de entrega deve ser de no mínimo 7 dias a partir de hoje.
          Caso uma data anterior seja informada, ajustaremos automaticamente para cumprir esse prazo mínimo.
    </AlertDescription>
      </Alert>
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Detalhamento da Demanda</CardTitle>
          <ModeToggle />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <Label>Resumo da Demanda</Label>
            <Input name="context" value={formData.context} onChange={handleChange} placeholder="Ex: Integração API X ↔ Y (Interpretado como um título)" required />

            <Label>Descrição</Label>
            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descrição detalhada – Inclua o máximo de informações para um processo eficiente" required />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-4">Análise de Implementação</Label>
                <Select onValueChange={value => handleSelectChange("classification", value)}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend – Alterações visuais (UI/UX)</SelectItem>
                    <SelectItem value="backend">Backend – Integrações, lógica de negócio, APIs</SelectItem>
                    <SelectItem value="both">Não consigo indetificar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-4">Etiqueta</Label>
                <Select onValueChange={value => handleSelectChange("type", value)}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature">Feature – Nova funcionalidade</SelectItem>
                    <SelectItem value="fix">Fix – Correção de bug</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer w-full">
                  <Camera className="h-6 w-6" />
                  <span className="text-sm truncate">
                    {formData.image ? formData.image.name : "Imagem"}
                  </span>
                  <Input type="file" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              <Input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} required className="h-12" />
              <Input name="nameRegister" value={formData.nameRegister} onChange={handleChange} placeholder="Registrado por" required className="h-12" />
              <Button type="submit" className="h-12 w-full">Enviar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
