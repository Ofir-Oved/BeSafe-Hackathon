import PropTypes from "prop-types";

export default function Chat({ title }) {
  return (
    <main className="w-full max-w-3xl mx-auto rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center justify-between gap-3">
          <div className="text-lg font-semibold bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </div>

          <div className="text-xs text-white/60">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 align-middle" />{" "}
            online
          </div>
        </div>
      </header>

      {/* Messages */}
      <section className="p-5 space-y-3 max-h-[70vh] overflow-auto" dir="rtl">
        {/* Bot */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-white/10 border border-white/10 px-4 py-3 text-white">
            היי! ראיתי שגם אתה אוהב פורטנייט
            <div className="mt-1 text-[11px] text-white/50">12:03</div>
          </div>
        </div>

        {/* User */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gradient-to-r from-sky-400/90 to-pink-400/90 text-slate-900 px-4 py-3 font-medium">
            כן אני תמיד בעשרה הראשונים
            <div className="mt-1 text-[11px] text-slate-900/70">12:04</div>
          </div>
        </div>

        {/* Bot */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-white/10 border border-white/10 px-4 py-3 text-white">
            וואו אתה טוב
            <div className="mt-1 text-[11px] text-white/50">12:05</div>
          </div>
        </div>
      </section>

      {/* Input */}
      <footer className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            className="
              flex-1 rounded-xl bg-white/5 border border-white/10
              px-4 py-3 text-white placeholder:text-white/40
              outline-none focus:ring-2 focus:ring-sky-400/60 focus:border-sky-400/40
            "
            placeholder="הקלד הודעה..."
            disabled
            dir="rtl"
          />

          <button
            className="
              rounded-xl px-5 py-3 font-semibold
              bg-gradient-to-r from-sky-400 to-pink-400
              hover:from-sky-500 hover:to-pink-500
              text-slate-900 disabled:opacity-60 transition
            "
            disabled
          >
            שלח
          </button>
        </div>
      </footer>
    </main>
  );
}

Chat.propTypes = {
  title: PropTypes.string.isRequired,
};
