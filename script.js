/**
 * 异环助手官网 - 交互脚本
 */

// 固定下载链接
const DOWNLOAD_URL = 'https://gitee.com/wangfuguiC/yufu-yihuan/releases/download/v1.0.1/YUFU-YIHUANv1.0.1.exe';

// 滚动监听 - 导航高亮
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 移动端菜单
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        menuBtn.classList.toggle('active');
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
            menuBtn.classList.remove('active');
        });
    });
}

// 下载统计
function trackDownload() {
    console.log('下载按钮点击');
}

// 从 Gitee 获取最新版本号
async function fetchLatestVersion() {
    try {
        // 使用 Gitee API 获取最新 release
        const response = await fetch('https://gitee.com/api/v5/repos/wangfuguiC/yufu-yihuan/releases/latest');
        
        if (!response.ok) {
            throw new Error('获取版本失败');
        }
        
        const data = await response.json();
        const version = data.tag_name; // 例如 "v1.4.3"
        
        // 更新页面上的版本显示
        updateVersion(version);
        
    } catch (error) {
        console.log('无法获取最新版本，使用默认版本');
        // 获取失败时使用默认版本（如果 HTML 中有默认值则保留）
    }
}

// 更新页面版本号
function updateVersion(version) {
    // 移除 v 前缀，保持一致性
    const displayVersion = version.replace(/^v/, '');
    
    // 更新 Hero 区域版本
    const heroVersion = document.getElementById('hero-version');
    if (heroVersion) {
        heroVersion.textContent = `${version} 现已发布`;
    }
    
    // 更新页脚版本
    const footerVersion = document.getElementById('footer-version');
    if (footerVersion) {
        footerVersion.textContent = version;
    }
    
    // 更新页脚下载链接文字
    const footerLink = document.getElementById('footer-download-link');
    if (footerLink) {
        footerLink.innerHTML = `最新版本 ${version}`;
    }
}

// 动画入场效果
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .faq-item').forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

// FAQ 手风琴效果
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(other => {
                    if (other !== item && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 页面加载完成
document.addEventListener('DOMContentLoaded', () => {
    initScrollSpy();
    initMobileMenu();
    initScrollAnimations();
    initFAQ();
    initSmoothScroll();
    
    // 获取最新版本号
    fetchLatestVersion();
});
