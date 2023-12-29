import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export function YearsSelect() {
  function generateYearsArray() {
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: currentYear - 1999 }, (_, index) => 2000 + index);
    return yearsArray;
  }

  const years = generateYearsArray();

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Ano" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => <SelectItem key={year} value={`${year}`}>{year}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}

export function MonthsSelect() {
  function generateYearsArray() {
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: currentYear - 1999 }, (_, index) => 2000 + index);
    return yearsArray;
  }

  const years = generateYearsArray();

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => <SelectItem key={year} value={`${year}`}>{year}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}

export function DaySelect() {
  function generateYearsArray() {
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: currentYear - 1999 }, (_, index) => 2000 + index);
    return yearsArray;
  }

  const years = generateYearsArray();

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Dia" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => <SelectItem key={year} value={`${year}`}>{year}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}
