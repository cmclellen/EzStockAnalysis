import { getCountries } from "../_lib/data-service";

type CountryInfo = {
  name: string;
  flag: string;
};

type SelectCountryProps = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};

function formatOptionValue(c: CountryInfo | null) {
  if (!c) return "";
  return `${c.name}%${c.flag}`;
}

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProps) {
  const countries = await getCountries();
  const defaultCountryOption = countries.find(
    (country: CountryInfo) => country.name === defaultCountry
  );

  return (
    <select
      name={name}
      id={id}
      className={className}
      defaultValue={formatOptionValue(defaultCountryOption)}
    >
      <option value="">Select country...</option>
      {countries.map((c: CountryInfo) => (
        <option key={c.name} value={formatOptionValue(c)}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
