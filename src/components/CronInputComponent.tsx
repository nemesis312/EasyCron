function CronInputComponent({ label, name, min, max, interval, value, onChange, includeStar = false }: { label: string, name: string, min: number, max: number, interval: Array<string>, value: any, onChange: (value: any) => void, includeStar?: boolean }) {
    let options = [];
    if (includeStar) {
      options.push(<option key="*" value="*">*</option>);
    }
    if(interval){
      for (let i = 1; i < interval.length; i++) {
        options.push(<option key={i} value={interval[i]}>{interval[i]}</option>);
      }
    }
    for (let i = min; i <= max; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    
  
    return (
      <div className="flex flex-col">
        <label>{label}:
        </label>
          <select className="text-black rounded  py-2" name={name} value={value} onChange={e => onChange(e.target.value)} required>
            {options}
          </select>
      </div>
    );
  }

export default CronInputComponent