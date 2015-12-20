using System;
using System.Runtime.InteropServices;

namespace PacProxyUsage
{
	/// <summary>
	/// Summary description for Win32Api.
	/// </summary>
	public class Win32Api
	{
        #region AutoProxy Constants 
        /// <summary>
        /// Applies only when setting proxy information
        /// </summary>
        public const int WINHTTP_ACCESS_TYPE_DEFAULT_PROXY = 0;
        /// <summary>
        /// Internet accessed through a direct connection 
        /// </summary>
        public const int WINHTTP_ACCESS_TYPE_NO_PROXY = 1;
        /// <summary>
        /// Internet accessed using a proxy
        /// </summary>
        public const int WINHTTP_ACCESS_TYPE_NAMED_PROXY = 3;        
        /// <summary>
        /// Attempt to automatically discover the URL of the 
        /// PAC file using both DHCP and DNS queries to the local network.
        /// </summary>
        public const int WINHTTP_AUTOPROXY_AUTO_DETECT = 0x00000001;
        /// <summary>
        /// Download the PAC file from the URL in the WINHTTP_AUTOPROXY_OPTIONS structure.
        /// </summary>
        public const int WINHTTP_AUTOPROXY_CONFIG_URL = 0x00000002;
        /// <summary>
        /// Executes the Web Proxy Auto-Discovery (WPAD) protocol in-process instead of 
        /// delegating to an out-of-process WinHTTP AutoProxy Service, if available. 
        /// This flag must be combined with one of the other flags
        /// </summary>
        public const int WINHTTP_AUTOPROXY_RUN_INPROCESS = 0x00010000;
        /// <summary>
        /// By default, WinHTTP is configured to fall back to auto-discover a proxy 
        /// in-process. If this fallback behavior is undesirable in the event that 
        /// an out-of-process discovery fails, it can be disabled using this flag.
        /// </summary>
        public const int WINHTTP_AUTOPROXY_RUN_OUTPROCESS_ONLY = 0x00020000;
        /// <summary>
        /// Use DHCP to locate the proxy auto-configuration file.
        /// </summary>
        public const int WINHTTP_AUTO_DETECT_TYPE_DHCP = 0x00000001;
        /// <summary>
        /// Use DNS to attempt to locate the proxy auto-configuration file at a 
        /// well-known location on the domain of the local computer
        /// </summary>
        public const int WINHTTP_AUTO_DETECT_TYPE_DNS_A = 0x00000002;
        #endregion
        
        #region Proxy Structures 
        /// <summary>
        /// The structure is used to indicate to the WinHttpGetProxyForURL 
        /// function whether to specify the URL of the Proxy Auto-Configuration 
        /// (PAC) file or to automatically locate the URL with DHCP or DNS 
        /// queries to the network
        /// </summary>
        [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]
            public struct WINHTTP_AUTOPROXY_OPTIONS {
            /// <summary>
            /// Mechanisms should be used to obtain the PAC file
            /// </summary>
            [MarshalAs(UnmanagedType.U4)]
            public int dwFlags;
            /// <summary>
            /// If dwflags includes the WINHTTP_AUTOPROXY_AUTO_DETECT flag, 
            /// then dwAutoDetectFlags specifies what protocols are to be 
            /// used to locate the PAC file. If both the DHCP and DNS auto 
            /// detect flags are specified, then DHCP is used first;
            /// if no PAC URL is discovered using DHCP, then DNS is used.
            /// If dwflags does not include the WINHTTP_AUTOPROXY_AUTO_DETECT 
            /// flag, then dwAutoDetectFlags must be zero.
            /// </summary>
            [MarshalAs(UnmanagedType.U4)]
            public int dwAutoDetectFlags;
            /// <summary>
            /// If dwflags includes the WINHTTP_AUTOPROXY_CONFIG_URL flag, the 
            /// lpszAutoConfigUrl must point to a null-terminated Unicode string 
            /// that contains the URL of the proxy auto-configuration (PAC) file.
            /// If dwflags does not include the WINHTTP_AUTOPROXY_CONFIG_URL flag, 
            /// then lpszAutoConfigUrl must be NULL.
            /// </summary>
            public string lpszAutoConfigUrl;
            /// <summary>
            /// Reserved for future use; must be NULL.
            /// </summary>
            public IntPtr lpvReserved;
            /// <summary>
            /// Reserved for future use; must be zero.
            /// </summary>
            [MarshalAs(UnmanagedType.U4)]
            public int dwReserved;
            /// <summary>
            /// Specifies whether the client's domain credentials should be automatically 
            /// sent in response to an NTLM or Negotiate Authentication challenge when 
            /// WinHTTP requests the PAC file.
            /// If this flag is TRUE, credentials should automatically be sent in response 
            /// to an authentication challenge. If this flag is FALSE and authentication 
            /// is required to download the PAC file, the WinHttpGetProxyForUrl fails.
            /// </summary>
			[MarshalAs(UnmanagedType.Bool)]
            public bool fAutoLoginIfChallenged;

        }
 
        /// <summary>
        /// The structure contains the session or default proxy configuration.
        /// </summary>
        [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]
            public struct WINHTTP_PROXY_INFO {
            /// <summary>
            /// Unsigned long integer value that contains the access type
            /// </summary>   
            [MarshalAs(UnmanagedType.U4)]
            public int dwAccessType;
            /// <summary>
            /// Pointer to a string value that contains the proxy server list
            /// </summary>
            public string lpszProxy;
            /// <summary>
            /// Pointer to a string value that contains the proxy bypass list
            /// </summary>
            public string lpszProxyBypass;
        } 
        #endregion 

        #region WinHttp
        /// <summary>
        /// This function implements the Web Proxy Auto-Discovery (WPAD) protocol 
        /// for automatically configuring the proxy settings for an HTTP request. 
        /// The WPAD protocol downloads a Proxy Auto-Configuration (PAC) file, 
        /// which is a script that identifies the proxy server to use for a given 
        /// target URL. PAC files are typically deployed by the IT department within 
        /// a corporate network environment. The URL of the PAC file can either be 
        /// specified explicitly or WinHttpGetProxyForUrl can be instructed to 
        /// automatically discover the location of the PAC file on the local network.
        /// </summary>
        /// <param name="hSession">The WinHTTP session handle returned by the WinHttpOpen function</param>
        /// <param name="lpcwszUrl">A pointer to a null-terminated Unicode string that contains the 
        /// URL of the HTTP request that the application is preparing to send.</param>
        /// <param name="pAutoProxyOptions">A pointer to a WINHTTP_AUTOPROXY_OPTIONS structure that 
        /// specifies the auto-proxy options to use.</param>
        /// <param name="pProxyInfo">A pointer to a WINHTTP_PROXY_INFO structure that receives the 
        /// proxy setting. This structure is then applied to the request handle using the 
        /// WINHTTP_OPTION_PROXY option.</param>
        /// <returns></returns>
        [DllImport("winhttp.dll", SetLastError=true, CharSet=CharSet.Unicode)]        
        public static extern bool WinHttpGetProxyForUrl(
            IntPtr hSession,
            string lpcwszUrl,
            ref WINHTTP_AUTOPROXY_OPTIONS pAutoProxyOptions,
            ref WINHTTP_PROXY_INFO pProxyInfo); 
        
        /// <summary>
        /// The function initializes, for an application, the use of WinHTTP 
        /// functions and returns a WinHTTP-session handle
        /// </summary>
        /// <param name="pwszUserAgent">A pointer to a string variable that contains the name of the 
        /// application or entity calling the WinHTTP functions.</param>
        /// <param name="dwAccessType">Type of access required. This can be one of the following values</param>
        /// <param name="pwszProxyName"> A pointer to a string variable that contains the name of the 
        /// proxy server to use when proxy access is specified by setting dwAccessType to 
        /// WINHTTP_ACCESS_TYPE_NAMED_PROXY. The WinHTTP functions recognize only CERN type proxies for HTTP. 
        /// If dwAccessType is not set to WINHTTP_ACCESS_TYPE_NAMED_PROXY, this parameter must be set 
        /// to WINHTTP_NO_PROXY_NAME</param>
        /// <param name="pwszProxyBypass">A pointer to a string variable that contains an optional list 
        /// of host names or IP addresses, or both, that should not be routed through the proxy when 
        /// dwAccessType is set to WINHTTP_ACCESS_TYPE_NAMED_PROXY. The list can contain wildcard characters. 
        /// Do not use an empty string, because the WinHttpOpen function uses it as the proxy bypass list. 
        /// If this parameter specifies the "&lt;local&gt;" macro as the only entry, this function bypasses 
        /// any host name that does not contain a period. If dwAccessType is not set to WINHTTP_ACCESS_TYPE_NAMED_PROXY, 
        /// this parameter must be set to WINHTTP_NO_PROXY_BYPASS.</param>
        /// <param name="dwFlags">Unsigned long integer value that contains the flags that indicate various options 
        /// affecting the behavior of this function</param>
        /// <returns>Returns a valid session handle if successful, or NULL otherwise</returns>
        [DllImport("winhttp.dll", SetLastError=true, CharSet=CharSet.Unicode)]
        public static extern IntPtr WinHttpOpen(
            string pwszUserAgent,
            int dwAccessType,
            IntPtr pwszProxyName,
            IntPtr pwszProxyBypass,
            int dwFlags
            );
        
        /// <summary>
        /// The function closes a single HINTERNET handle
        /// </summary>
        /// <param name="hInternet">Valid HINTERNET handle to be closed.</param>
        /// <returns>Returns TRUE if the handle is successfully closed, or FALSE otherwise</returns>
        [DllImport("winhttp.dll", SetLastError=true, CharSet=CharSet.Unicode)]
        public static extern bool WinHttpCloseHandle(IntPtr hInternet);

        #endregion
        
        [DllImport("kernel32.dll")]
        public static extern int GetLastError(); 
        
	}
}
