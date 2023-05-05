import Input from "@/components/ui/Input";

export default function AddressSettings() {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Input label="Straße" value={accountCopy.street} onChange={(value) => setAccountCopy("street", value)} />
        </div>
        <Input label="Hausnummer" value={accountCopy.house_number} onChange={(value) => setAccountCopy("house_number", value)} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Input label="Ort" value={accountCopy.city} onChange={(value) => setAccountCopy("city", value)} />
        </div>
        <Input
          label="PLZ"
          type="number"
          value={accountCopy.zip?.toString()}
          onChange={(value) => setAccountCopy("zip", +value)}
        />
      </div>
    </>
  );
}
