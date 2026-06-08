import { Link } from "react-router-dom";
import listImg from "../assets/icons/list.svg";
import fourSquaresImg from "../assets/icons/four-squares.svg";
import teamImg from "../assets/icons/team.svg";
import leaderboardImg from "../assets/icons/leaderboard.svg";
import screenshotImg from "../assets/icons/screenshot.png";
 
export default function Landing() {
    return (
        <div className="max-w-5xl mx-auto px-6">
                <section className="text-center py-24">
                    <span className="inline-block text-xs font-medium tracking-widest uppercase text-gray-mid border border-gray-soft px-3 py-1 rounded-full mb-8">
                        UNITRACKER
                    </span>
                    <h1 className="text-5xl font-semibold tracking-tight leading-tight mb-5 text-gray-dark">
                        Conocé exactamente<br />dónde estás en tu carrera
                    </h1>
                    <p className="text-base text-gray-mid max-w-md mx-auto mb-10 leading-relaxed">
                        Visualizá tu avance, tus correlatividades y lo que te falta. Todo en un solo lugar.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            to="/register"
                            className="text-sm font-medium bg-gray-dark text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity"
                        >
                            Empezar gratis
                        </Link>
                    </div>
                </section>
 
                <div className="border border-gray-soft rounded-xl overflow-hidden mb-24">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-soft bg-white">
                        <div className="w-2 h-2 rounded-full bg-gray-soft" />
                        <div className="w-2 h-2 rounded-full bg-gray-soft" />
                        <div className="w-2 h-2 rounded-full bg-gray-soft" />
                        <span className="text-xs text-gray-mid ml-2 font-mono">unitracker.com / id-carrera</span>
                    </div>
                    <div className="overflow-hidden">
                        <img src={screenshotImg} alt="Unitracker app" className="w-full min-w-lg" />
                    </div>
                </div>
 
                <section className="mb-24">
                    <p className="text-xs font-medium tracking-widest uppercase text-gray-mid mb-5">Funcionalidades</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-gray-soft rounded-xl overflow-hidden gap-px bg-gray-soft">
                        {[
                            {
                                image: listImg,
                                title: "Correlatividades",
                                desc: "Sabé qué materias desbloqueás al aprobar cada una, sin tener que leer el plan de estudios.",
                            },
                            {
                                image: fourSquaresImg,
                                title: "Carrera personalizada",
                                desc: "Creá tu propio plan con las materias y categorías que corresponden a tu situación.",
                            },
                            {
                                image: teamImg,
                                title: "Compartir y clonar",
                                desc: "Copiá la carrera de un compañero como punto de partida y personalizala a partir de ahí.",
                            },
                            {
                                image: leaderboardImg,
                                title: "Seguimiento de avance",
                                desc: "Notas, horas semanales y estado de las materias.",
                            },
                        ].map((f) => (
                            <div key={f.title} className="p-7 bg-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <img src={f.image} className="w-4 h-4"/>
                                    <h3 className="text-sm font-medium text-gray-dark">{f.title}</h3>
                                </div>
                                <p className="text-sm text-gray-mid leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
 
                <section className="text-center border border-gray-soft rounded-xl bg-gray-light px-8 py-16 mb-24">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-dark mb-3">Empezá a usarla hoy</h2>
                    <p className="text-sm text-gray-mid mb-8 leading-relaxed">
                        Ingresá gratis y empezá a cargar tu carrera.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <Link
                            to="/register"
                            className="text-sm font-medium bg-gray-dark text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity"
                        >
                            Crear cuenta
                        </Link>
                        <a
                            href="https://github.com/ferminsorzzoni/unitracker"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium border border-gray-soft px-6 py-3 rounded-lg hover:bg-white transition-colors text-gray-dark"
                        >
                            Ver en GitHub
                        </a>
                    </div>
                </section>
 
        </div>
    );
}