import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function Home() {
  // جلب البيانات من جدول Job (J كبيرة كما عندك)
  const { data: jobs, error } = await supabase
    .from('Job')
    .select('*')
    .order('is_featured', { ascending: false });

  if (error) console.error('Error fetching jobs:', error);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation / Header */}
      <nav className="bg-white shadow-sm p-4 mb-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">RemoteJobs MA 🇲🇦</h1>
          <Link href="/post" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            + Post a Job
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-4">
        <header className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">لقى خدمتك عن بعد من الدار 🏠</h2>
          <p className="text-gray-600 text-lg">أفضل الوظائف التقنية في المغرب وفي الخارج</p>
        </header>

        <div className="space-y-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <div 
                key={job.id} 
                className={`p-6 rounded-xl shadow-sm border-2 transition hover:scale-[1.01] ${
                  job.is_featured ? 'border-yellow-400 bg-yellow-50' : 'border-white bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    {job.is_featured && (
                      <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded uppercase mb-2 inline-block">
                        ⭐ Featured
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <div className="text-right text-gray-500 text-sm">
                    <p className="font-bold text-green-600">{job.salary}</p>
                    <p>{job.location}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">باقي مالقينا والو.. جرب تزيد أول خدمة من Supabase!</p>
          )}
        </div>
      </div>
    </main>
  )
}
