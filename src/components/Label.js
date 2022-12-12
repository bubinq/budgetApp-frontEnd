import { useTheme } from "../hooks/useTheme";

export const Label = ({ data }) => {
  const theme = useTheme();
  return (
    <div className="labelData">
      <div
        className="labelColor"
        style={{
          backgroundColor: data.color,
          width: `${1 * data.percentage}px`,
          height: "20px",
          borderRadius: "35%",
        }}
      ></div>
      <span className="percentage" style={{ color: theme.text }}>
        % {Math.round(data.percentage)}
      </span>
      <span className="categoryName" style={{ color: theme.text }}>
        {" "}
        {data.category}
      </span>
    </div>
  );
};
