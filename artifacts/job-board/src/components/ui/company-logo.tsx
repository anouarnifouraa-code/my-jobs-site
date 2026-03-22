const COLORS = [
  ["#dbeafe", "#1d4ed8"],
  ["#dcfce7", "#15803d"],
  ["#fef9c3", "#a16207"],
  ["#fce7f3", "#be185d"],
  ["#ede9fe", "#6d28d9"],
  ["#ffedd5", "#c2410c"],
  ["#e0f2fe", "#0369a1"],
  ["#f0fdf4", "#166534"],
];

function getColor(name: string): [string, string] {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

interface CompanyLogoProps {
  logo: string | null;
  company: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { outer: "h-10 w-10 text-sm rounded-xl", border: "border-2" },
  md: { outer: "h-16 w-16 text-xl rounded-2xl", border: "border border-border/50" },
  lg: { outer: "h-24 w-24 text-3xl rounded-2xl border-4 border-card shadow-lg", border: "" },
};

export function CompanyLogo({ logo, company, size = "md" }: CompanyLogoProps) {
  const { outer, border } = sizeMap[size];
  const isInitial = logo && logo.length <= 2;
  const [bg, fg] = getColor(company);

  if (logo && !isInitial) {
    return (
      <div className={`shrink-0 ${outer} ${border} overflow-hidden bg-secondary/50 flex items-center justify-center`}>
        <img src={logo} alt={`${company} logo`} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`shrink-0 ${outer} ${border} flex items-center justify-center font-bold`}
      style={{ backgroundColor: bg, color: fg }}
    >
      {isInitial ? logo : (company[0] ?? "?")}
    </div>
  );
}
