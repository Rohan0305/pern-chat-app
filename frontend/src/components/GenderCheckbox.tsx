const GenderCheckbox = ({
  selectedGender,
  setGender,
}: {
  selectedGender: string;
  setGender: (value: "male" | "female") => void;
}) => {
  return (
    <div className="flex space-x-2 mt-2">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender == "male"}
            onChange={() => setGender("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender == "female"}
            onChange={() => setGender("female")}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
