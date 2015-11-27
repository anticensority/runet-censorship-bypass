using System;
using System.IO;

using PacProxyUsage;
using System.Runtime.InteropServices;

using System.Text.RegularExpressions;

public class Program
{

  public static string RunTest(string hostsFile, string pacName, bool ifMissing = false) {
    using(StreamReader hostsReader = new StreamReader(hostsFile))
	{
	  string pacUri = "http://localhost:8080/"+pacName+"?"+new Random().Next();
	  GC.Collect();
	  long memBefore = GC.GetTotalMemory(true);

	  var myTimer = new QueryPerfCounter();
	  myTimer.Start();

	  int iterations = 0;
	  string host;
	  while( (host = hostsReader.ReadLine()) != null )
	  {
		string uri = Proxy.GetProxyForUrlUsingPac( "http://"+host, pacUri );
		if (ifMissing && uri != null || !ifMissing && uri == null)
		  Console.WriteLine("DIRECT !" + host + "!");
		//else Console.WriteLine("PROXY !" + uri + "!"); // For DEBUG.
		++iterations;
	  }

	  myTimer.Stop();
	  // Calculate time per iteration in nanoseconds
	  double duration = myTimer.Duration(iterations);

	  long memAfter = GC.GetTotalMemory(false);
	  long memUsage = memAfter - memBefore;
	  double memPerAddr = memUsage / (double) iterations;

	  var resultNs = Convert.ToInt32(duration).ToString();
	  var resultBytes = Convert.ToInt32(memPerAddr).ToString();
	  return string.Format( "{0} bytes, {1} ns", resultBytes, resultNs );	  
	}
  }

  public static void Main(string[] args)
  {
    if (args.Length != 1 || !Directory.Exists(args[0]))
    {
      Console.WriteLine("Arguments: PACs-dir.\nPac scripts must be served from the root of localhost:8080.");
      return;
    }

	bool ifAppend = true;
    using (StreamWriter resultsWriter = new StreamWriter("Output.txt", ifAppend))
    {
	  resultsWriter.WriteLine("======================");

      var pacsPath = args[0];
      string [] pacs = Directory.GetFiles(pacsPath);

      foreach(string pacPath in pacs)
      {
		string pacName = Path.GetFileName(pacPath);

        Regex r = new Regex(@"^(\w+-\w+)", RegexOptions.IgnoreCase);
        Match m = r.Match(pacName);
        var prefix = m.Groups[1].ToString();
        var hostsFile = "./Inputs/"+prefix + ".txt";
		var missedFile = "./Inputs/missed.txt";
		
		var results = pacName+":\t"+RunTest(hostsFile, pacName) + ", Missed: "+RunTest(missedFile, pacName, true);
		Console.WriteLine(results);
        resultsWriter.WriteLine(results);
      }
    }
  }

}

public class QueryPerfCounter
{
  [DllImport("KERNEL32")]
  private static extern bool QueryPerformanceCounter(
    out long lpPerformanceCount);

  [DllImport("Kernel32.dll")]
  private static extern bool QueryPerformanceFrequency(out long lpFrequency);

  private long start;
  private long stop;
  private long frequency;
  Decimal multiplier = new Decimal(1.0e9);

  public QueryPerfCounter()
  {
    if (QueryPerformanceFrequency(out frequency) == false)
    {
      // Frequency not supported
      throw new Exception();
    }
  }

  public void Start()
  {
    QueryPerformanceCounter(out start);
  }

  public void Stop()
  {
    QueryPerformanceCounter(out stop);
  }

  public double Duration(int iterations)
  {
    return ((((double)(stop - start)* (double) multiplier) / (double) frequency)/iterations);
  }
}
