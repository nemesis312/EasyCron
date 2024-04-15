function TooltipComponent({ message, children }: { message: string, children: React.ReactNode }) {
    return (
    <div className="group relative flex">
        {children}
        <span className="absolute -top-16 scale-0 transition-all rounded bg-gray-800 p-2 text-md text-white group-hover:scale-100">{message}</span>
    </div>
    )
}

export default TooltipComponent