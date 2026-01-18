import { CheckCircle2, User } from 'lucide-react';

export default function Demo() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Preview of the intuitive user interface
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-200">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-4">
              <h3 className="text-white font-semibold text-lg">Preference Form</h3>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sleep Schedule
                  </label>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg font-medium">
                      Early Bird
                    </button>
                    <button className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium">
                      Night Owl
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cleanliness Level
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value="8"
                    className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer"
                    readOnly
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Relaxed</span>
                    <span>Very Clean</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Study vs Social
                  </label>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg font-medium">
                      Study-Focused
                    </button>
                    <button className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium">
                      Social
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked
                    className="w-5 h-5 text-teal-600 rounded"
                    readOnly
                  />
                  <label className="text-sm text-gray-700">Non-smoker required</label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-200">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4">
              <h3 className="text-white font-semibold text-lg">Match Results</h3>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                <div className="border-2 border-green-500 rounded-xl p-6 bg-green-50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-teal-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center">
                      <User className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">Priya Sharma</h4>
                      <p className="text-sm text-gray-600">Computer Science, 2nd Year</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">94%</div>
                      <div className="text-xs text-gray-600">Match</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="text-green-600" size={16} />
                      <span>Both early birds</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="text-green-600" size={16} />
                      <span>Similar cleanliness standards</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="text-green-600" size={16} />
                      <span>Study-focused lifestyle</span>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center">
                      <User className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">Ananya Reddy</h4>
                      <p className="text-sm text-gray-600">Electronics, 1st Year</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-600">87%</div>
                      <div className="text-xs text-gray-600">Match</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
