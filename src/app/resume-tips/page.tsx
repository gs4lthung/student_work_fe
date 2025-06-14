import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, Users, TrendingUp, Star, Download, Eye, Edit } from "lucide-react"

export default function ResumeTips() {
  const tips = [
    {
      category: "Format & Design",
      icon: <FileText className="h-5 w-5" />,
      tips: [
        "Keep it to 1-2 pages maximum",
        "Use a clean, professional font (Arial, Calibri, or Times New Roman)",
        "Maintain consistent formatting throughout",
        "Use bullet points for easy scanning",
        "Include plenty of white space",
      ],
    },
    {
      category: "Content Strategy",
      icon: <Edit className="h-5 w-5" />,
      tips: [
        "Tailor your resume for each job application",
        "Use action verbs to start bullet points",
        "Quantify achievements with numbers and percentages",
        "Focus on accomplishments, not just responsibilities",
        "Include relevant keywords from the job posting",
      ],
    },
    {
      category: "Professional Impact",
      icon: <TrendingUp className="h-5 w-5" />,
      tips: [
        "Start with a compelling professional summary",
        "Highlight your most relevant experience first",
        "Show career progression and growth",
        "Include relevant certifications and skills",
        "Proofread multiple times for errors",
      ],
    },
  ]

  const sections = [
    { name: "Contact Information", required: true },
    { name: "Professional Summary", required: true },
    { name: "Work Experience", required: true },
    { name: "Education", required: true },
    { name: "Skills", required: true },
    { name: "Certifications", required: false },
    { name: "Projects", required: false },
    { name: "Volunteer Work", required: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Pro Tips</h1>
                <p className="text-gray-600">Build a winning resume that gets noticed</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Create a Resume That Gets You Hired</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our expert tips and best practices to craft a professional resume that stands out to recruiters and
            hiring managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">6 seconds</div>
              <p className="text-gray-600">Average time recruiters spend reviewing a resume</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">75%</div>
              <p className="text-gray-600">Of resumes are filtered out by ATS systems</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">3x</div>
              <p className="text-gray-600">More likely to get interviews with optimized resume</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Essential Resume Tips</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tips.map((category, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">{category.icon}</div>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Essential Resume Sections</h3>
          <Card>
            <CardHeader>
              <CardTitle>What to Include in Your Resume</CardTitle>
              <CardDescription>
                Here are the key sections every resume should have, plus optional sections to consider
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sections.map((section, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium text-gray-900">{section.name}</span>
                    <Badge variant={section.required ? "default" : "secondary"}>
                      {section.required ? "Required" : "Optional"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Power Words for Your Resume</h3>
          <Card>
            <CardHeader>
              <CardTitle>Action Verbs That Make an Impact</CardTitle>
              <CardDescription>
                Use these powerful action words to start your bullet points and make your achievements stand out
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  "Achieved",
                  "Analyzed",
                  "Built",
                  "Created",
                  "Developed",
                  "Enhanced",
                  "Executed",
                  "Generated",
                  "Implemented",
                  "Improved",
                  "Increased",
                  "Led",
                  "Managed",
                  "Optimized",
                  "Organized",
                  "Reduced",
                  "Resolved",
                  "Streamlined",
                ].map((word, index) => (
                  <Badge key={index} variant="outline" className="justify-center py-2">
                    {word}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Common Resume Mistakes to Avoid</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                mistake: "Using an unprofessional email address",
                solution: "Create a professional email with your name",
              },
              {
                mistake: "Including irrelevant work experience",
                solution: "Focus on relevant experience for the target role",
              },
              {
                mistake: "Using passive language",
                solution: "Start bullet points with strong action verbs",
              },
              {
                mistake: "Not quantifying achievements",
                solution: "Include numbers, percentages, and specific results",
              },
              {
                mistake: "Having typos and grammatical errors",
                solution: "Proofread carefully and use spell-check tools",
              },
              {
                mistake: "Using outdated formatting",
                solution: "Keep design clean, modern, and ATS-friendly",
              },
            ].map((item, index) => (
              <Card key={index} className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="mb-3">
                    <h4 className="font-semibold text-red-700 mb-2">❌ Mistake:</h4>
                    <p className="text-gray-700">{item.mistake}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">✅ Solution:</h4>
                    <p className="text-gray-700">{item.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center bg-gray-800 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Build Your Perfect Resume?</h3>
          <p className="text-xl mb-8 opacity-90">
            Download our free resume template and start creating a resume that gets results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Download className="h-5 w-5 mr-2" />
              Download Free Template
            </Button>
            <Button size="lg" variant="outline" className="text-blue-600 border-white hover:bg-white">
              View Resume Examples
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Resume Pro Tips</h3>
            </div>
            <p className="text-gray-400 mb-6">Helping job seekers create professional resumes that get noticed.</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

