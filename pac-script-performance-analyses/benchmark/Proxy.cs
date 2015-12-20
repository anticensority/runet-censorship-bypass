using System;

namespace PacProxyUsage
{
	/// <summary>
	/// Summary description for Proxy.
	/// </summary>
	public class Proxy
	{
		public Proxy()
		{
		}

        /// <summary>
        /// Return proxy for requested Url
        /// </summary>
        /// <param name="sUrl">url</param>
        /// <param name="sPacUri">Uri to PAC file</param>
        /// <returns>proxy info</returns>
        public static string GetProxyForUrlUsingPac ( string DestinationUrl, string PacUri ){

            IntPtr WinHttpSession = Win32Api.WinHttpOpen("User", Win32Api.WINHTTP_ACCESS_TYPE_DEFAULT_PROXY, IntPtr.Zero, IntPtr.Zero, 0);

            Win32Api.WINHTTP_AUTOPROXY_OPTIONS  ProxyOptions   = new Win32Api.WINHTTP_AUTOPROXY_OPTIONS();
            Win32Api.WINHTTP_PROXY_INFO         ProxyInfo      = new Win32Api.WINHTTP_PROXY_INFO(); 
            
			ProxyOptions.fAutoLoginIfChallenged = true;
            ProxyOptions.dwFlags           = Win32Api.WINHTTP_AUTOPROXY_CONFIG_URL;
            ProxyOptions.dwAutoDetectFlags = (Win32Api.WINHTTP_AUTO_DETECT_TYPE_DHCP | Win32Api.WINHTTP_AUTO_DETECT_TYPE_DNS_A);
            ProxyOptions.lpszAutoConfigUrl = PacUri;
            
            // Get Proxy 
            bool IsSuccess = Win32Api.WinHttpGetProxyForUrl( WinHttpSession, DestinationUrl, ref ProxyOptions, ref ProxyInfo );
            
            Win32Api.WinHttpCloseHandle(WinHttpSession);

            if ( IsSuccess ){
                return ProxyInfo.lpszProxy;
            }else {
                Console.WriteLine("Error: {0}", Win32Api.GetLastError() );
                return null;
            }
        }
       
	}
}
