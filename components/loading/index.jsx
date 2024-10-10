const Loading = () => {
	return (
    <div className="relative flex justify-center items-center h-screen bg-black overflow-hidden">
    {/* Estrelas */}
    <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: 100 }).map((_, index) => (
            <div
                key={index}
                className="absolute bg-white rounded-full"
                style={{
                    width: `${Math.random() * 2}px`,
                    height: `${Math.random() * 2}px`,
                    top: `${Math.random() * 100}vh`,
                    left: `${Math.random() * 100}vw`,
                    opacity: Math.random() * 0.8 + 0.2,
                    animation: `blink ${Math.random() * 3 + 2}s infinite alternate`,
                }}
            />
        ))}
    </div>
    {/* Texto de Carregamento */}
    <h2 className="text-white text-lg">Carregando...</h2>
</div>
	);
};

export default Loading;
